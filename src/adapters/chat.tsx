import {firestore} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
const COLLECTION = firestore.collection("messages")

export const messages = () => {
    return COLLECTION
}
export const removeMessage = (id: string) => {
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

export const useMessagesStream = () => {
    const query = COLLECTION.orderBy('createdAt').limit(25);
    return useCollectionData<DataType>(query, {idField: 'id'})[0]
}

interface SendDataTypes  {
    uid: string,
    text: string,
    photo: string,
    createdAt: number,
    user: string,
}

export const sendMessage = (data: SendDataTypes) => COLLECTION.add(data)

