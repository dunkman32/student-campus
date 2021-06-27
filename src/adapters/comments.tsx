import {firestore} from "./helpers"
import {useCollectionData} from 'react-firebase-hooks/firestore';
const COLLECTION = firestore.collection("comments")

export const messages = () => {
    return COLLECTION
}
export const removeMessage = (id: string) => {
    return COLLECTION.doc(id).delete()
}


interface DataType {
    comment: string,
    userId: string,
    documentId: string,
    createdAt: number,
}

export const useMessagesStream = () => {
    const query = COLLECTION.orderBy('createdAt').limit(25);
    return useCollectionData<DataType>(query, {idField: 'id'})[0]
}

interface CommentType  {
    comment: string,
    userId: string,
    documentId: string,
}

export const addComment = (data: CommentType) => COLLECTION.add({
    ...data,
    status: 'new',
    createdAt: new Date().getTime()
})

