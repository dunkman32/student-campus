import {firestore} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
const COLLECTION = firestore.collection("documents")

export const messages = () => {
    return COLLECTION
}
export const removeMessage = (id: string) => {
    return COLLECTION.doc(id).delete()
}

enum Status {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

interface DataType {
    userId: string,
    username: string,
    file: any,
    desc: string,
    createdAt: number
}

export const useMessagesStream = () => {
    const query = COLLECTION.where("status", "==", Status.Pending);
    return useCollectionData<DataType>(query, {idField: 'id'})[0]
}

export const takeDocumentsWithFilters = (userId: string = '', status: string) => {
    let query = COLLECTION.where('userId', '==', userId)
    if (status){
        query = query.where("status", "==", status)
    }
    return query.get().then((r) => r.docs).catch(() => console.log('ერორი'))
}

export const takeDocuments = (status: string, obj: any) => {
    console.log('lolo', obj, status);
    let query = COLLECTION.limit(5)
    if(obj) {
        query = query
            .startAfter(obj.createdAt)
            .limit(5)
    }
    if (status){
        query = query
            .where("status", "==", status)
            .limit(5)
    }
    return query.get().then((r) => r.docs).catch(() => console.log('ერორი'))
}

interface SendDataTypes  {
    id: string,
    text: string,
    photo: string,
    createdAt: number,
    user: string,
    status: Status,
}

export const sendMessage = (data: SendDataTypes) => COLLECTION.add(data)
export const handleApprove = (data: SendDataTypes) => {
    console.log(data, 'handleApprove')
    let prod = COLLECTION.doc(data.id)
    return prod.update({
        ...data,
        status: Status.Approved
    })
}
export const handleRemove = (data: SendDataTypes) => {
    console.log(data, 'handleRemove')
    let prod = COLLECTION.doc(data.id)
    return prod.update({
        ...data,
        status: Status.Rejected
    })
}

