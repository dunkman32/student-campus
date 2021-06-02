import {firestore} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
const COLLECTION = firestore.collection("documents")

export const messages = () => {
    return COLLECTION
}
export const removeMessage = (id: string) => {
    return COLLECTION.doc(id).delete()
}

interface DataType {
    userId: string,
    username: string,
    file: any,
    desc: string,
    createdAt: number
}

export const useMessagesStream = () => {
    const query = COLLECTION.orderBy('createdAt').limit(25);
    return useCollectionData<DataType>(query, {idField: 'id'})[0]
}

interface SendDataTypes  {
    id: string,
    text: string,
    photo: string,
    createdAt: number,
    user: string,
    approved: boolean,
}

export const sendMessage = (data: SendDataTypes) => COLLECTION.add(data)
export const handleApprove = (data: SendDataTypes) => {
    console.log(data, 'handleApprove')
    let prod = COLLECTION.doc(data.id)
    return prod.update({
        ...data,
        approved: true
    })
}
export const handleRemove = (data: SendDataTypes) => {
    console.log(data, 'handleRemove')
    let prod = COLLECTION.doc(data.id)
    return prod.update({
        ...data,
        approved: false
    })
}

