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
    tel: string,
}

export const useStudentsStream = (limit: number = 25, first: any, last: any) => {
    const query = COLLECTION.orderBy('createdAt');
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
    return COLLECTION.orderBy('createdAt')
        .startAfter(last.createdAt)
        .limit(limit)
        .get()
}

export const prev = (limit: number = 25, first: any = null) => {
    return COLLECTION.orderBy('createdAt')
        .endBefore(first.createdAt)
        .limitToLast(limit)
        .get()
}
export const take = async (limit: number = 25, filterStr: string = '') => {
    const trimmed = filterStr.trim()
    if(trimmed) {
        const name = COLLECTION
            .where('name', '==', trimmed)
            .get()
        const idNumber = COLLECTION
            .where('idNumber', '==', trimmed)
            .get()
        const email = COLLECTION
            .where('email', '==', trimmed)
            .get()
        const campus = COLLECTION
            .where('campus', '==', trimmed)
            .get()

        const [A, B, C, D] = await Promise.all([name, idNumber, email, campus]);
        return [...A.docs, ...B.docs, ...C.docs, ...D.docs]
    }
    else {
        return COLLECTION
            .orderBy('createdAt')
            .limit(limit)
            .get()
    }
}


export const takeUserById = (id: string) => {
    return COLLECTION.doc(id).get().then((doc) => doc.data()).catch(() => {})
}

interface Students {
    name: string,
    email: string,
    idNumber: string,
    no: number,
    campus: string,
    birth: string,
    createdAt: number,
    file: any,
    tel: string
}

export const takeImg = (id: string) => {
    const starsRef = storage.ref(`students/${id}.jpg`);
// Get the download URL
    return starsRef.getDownloadURL()
        .then((url) => {
            return url
            // Insert url into an <img> tag to "download"
        })
}


export const addUserWithEmail = async (student: Students) => {
    try {
        const {user}: any = await auth.createUserWithEmailAndPassword(student.email, student.idNumber)
        const uid = user.uid
        await storage.ref().child(`students/${uid}.jpg`).put(student.file)
        const img = await takeImg(uid)
        const userOBJ = {
            ...omit(student, ['file']),
            uid,
            role: 'student',
            img
        }
        const savedUsr = await COLLECTION.doc(uid).set(userOBJ)
        return savedUsr
    } catch (e) {
        console.log(e)
    }
};

export const uploadFile = (name: string, file: any) => {
    return storage.ref().child(`students/${name}.jpg`).put(file)
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


