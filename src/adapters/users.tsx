import {firestore, auth, storage} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {createGlobalStyle} from "styled-components";
import {omit} from 'lodash'
const COLLECTION = firestore.collection("students")

export const students = () => {
    return COLLECTION
}
export const readUserById = (id: string) => {
    return COLLECTION.doc(id).get()
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

interface Students {
    name: string,
    email: string,
    idNumber: string,
    no: number,
    campus: string,
    birth: string,
    createdAt: number,
    file: any
};

export const addUserWithEmail = async (student: Students) => {
    try {
        const {user}: any = await auth.createUserWithEmailAndPassword(student.email, student.idNumber)
        const uid = user.uid
        const img = await storage.child(`students/${uid}.jpg`).put(student.file)
        const userOBJ = {
            ...omit(student, ['file']),
            uid,
            role: 'student'
        }
        const savedUsr = await COLLECTION.doc(uid).set(userOBJ)
        console.log(img, savedUsr, 'auth')
        return savedUsr
    } catch (e) {
        console.log(e)
    }

};


export const uploadFile = (name: string, file: any) => {
    console.log(file)
    return storage.child(`students/${name}.jpg`).put(file)
};

export const addStudent = (data: Students) => {
    return COLLECTION.add(data)
}

export const removeFilm = (id: string) => {
    return COLLECTION.doc(id).delete()
}

export const updateStudent = (data: any) => {
    let prod = COLLECTION.doc(data.id)
    return prod.update(data)
}


