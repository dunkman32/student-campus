import {firestore, auth, storage} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {omit} from 'lodash'

const COLLECTION = firestore.collection("students")

export const students = () => {
    return COLLECTION
}
export const readUserById = (id: string) => {
    return COLLECTION.doc(id).get()
}

export var totalSize: Number;
COLLECTION.get().then(querySnapshot => {      
    totalSize = querySnapshot.size
});

interface DataType {
    id: string
    uid: string,
    text: string,
    photo: string,
    createdAt: number,
    displayName: string,
}

export const useStudentsStream = (limit: number = 25, first: any, last: any) => {
    const query = COLLECTION.orderBy('createdAt');
    console.log(last, first);
    if (last) {
        query.startAfter(last.createdAt)
    }
    if (first) {
        query.endBefore(first.createdAt)
    }
    const data = useCollectionData<DataType>(query.limit(limit), {idField: 'id'})[0]
    return {
        rows: data,
        first: data && data[0],
        last: data && data[data.length - 1]
    }
}

export const next = (limit: number = 25, last: any = null) => {
    console.log('next')
    return COLLECTION.orderBy('createdAt')
        .startAfter(last.createdAt)
        .limit(limit)
        .get()
}

export const prev = (limit: number = 25, first: any = null) => {
    console.log('prev');
  return COLLECTION.orderBy('createdAt')
        .endBefore(first.createdAt)
        .limitToLast(limit)
        .get()
}
export const take = (limit: number = 25) =>
    COLLECTION.orderBy('createdAt')
        .limit(limit)
        .get()

interface Students {
    name: string,
    email: string,
    idNumber: string,
    no: number,
    campus: string,
    birth: string,
    createdAt: number,
    file: any
}

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
    let prod = COLLECTION.doc(data.uid)
    return prod.update(data)
}


