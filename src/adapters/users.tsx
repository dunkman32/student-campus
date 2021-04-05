import {firestore} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
const COLLECTION = firestore.collection("students")

export const students = () => {
    return COLLECTION
}
export const removeStudent = (id: string) => {
    return COLLECTION.doc(id).delete()
}


interface DataType {
    id: string
    uid: string,
    text: string,
    photo: string,
    createdAt: number,
    displayName: string,
}

export const useStudentsStream = () => {
    const query = COLLECTION.orderBy('createdAt').limit(25);
    return useCollectionData<DataType>(query, {idField: 'id'})[0]
}

interface Students  {
    name: string,
    ID: string,
    no: number,
    campus: string,
    birth: string,
    createdAt: number
}

export const addStudent = (data: Students) => COLLECTION.add(data)

