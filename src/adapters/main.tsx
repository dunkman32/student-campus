import {firestore} from "./helpers"

const FILM_COLLECTION = firestore.collection("films")

export function addFilm(data: {
    id?: string;
    name: string
}) {
    let film = FILM_COLLECTION.doc()
    data.id = film.id
    return film.set(data)
}

export async function getFilms() {
    let query: any = firestore.collection("films")
    return query.orderBy('addDate', 'desc').get()
}

export async function removeFilm(id: string) {
    return FILM_COLLECTION.doc(id).delete()
}

export const listen = () => {
    const query = firestore.collection('messages')

    return query.onSnapshot(querySnapshot => {

        const a = querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                console.log('New city: ', change.doc.data());
            }
            if (change.type === 'modified') {
                console.log('Modified city: ', change.doc.data());
            }
            if (change.type === 'removed') {
                console.log('Removed city: ', change.doc.data());
            }
        });
        console.log(a);
        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}
