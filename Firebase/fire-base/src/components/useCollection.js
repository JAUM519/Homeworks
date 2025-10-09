import { db } from '../firebase/config'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { useState } from 'react'

const useCollection = (table) => {
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const getAll = async (condition = null) => {
    setResults([])
    let q = collection(db, table)
    if (condition && condition.length === 3) {
      q = query(collection(db, table), where(condition[0], condition[1], condition[2]));
    } else {
    q = query(collection(db, table));
  }
  
  const resDocs = await getDocs(q)
    
  const list = resDocs.docs.map((d) => ({ id: d.id, ...d.data() }))
  setResults(list)
  }

  const add = async (docData) => {
    setError(null)
    setIsPending(true)
    try {
      const res = await addDoc(collection(db, table), docData)
      setIsPending(false)
      return res
    } catch (err) {
      console.error(err)
      setError(err.message)
      setIsPending(false)
      return null
    }
  }

  const updateDocById = async (id, newData) => {
    setIsPending(true)
    try {
      const ref = doc(db, table, id)
      await updateDoc(ref, newData)
      setIsPending(false)
      return true
    } catch (err) {
      console.error(err)
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  const deleteDocById = async (id) => {
    setIsPending(true)
    try {
      const ref = doc(db, table, id)
      await deleteDoc(ref)
      setIsPending(false)
      return true
    } catch (err) {
      console.error(err)
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  return { results, error, isPending, getAll, add, updateDocById, deleteDocById }
}

export default useCollection
