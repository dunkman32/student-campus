import React, {useEffect} from 'react';
import '../../App.css';
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from '../../modules/Users';
import {Info, Username, Photo, InfoDiv} from './styles'

interface T {
    id: string
}
const Index = ({id}: T) => {
    const user = useSelector(selectors.selectUserById)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getUserById.request(id))
    }, [dispatch])

    return user && (<InfoDiv>
        <Photo src={user.img} alt={'მომხმარებელი'}/>
        <>
            <Username>{user.name}</Username>
            <Info>ელ. ფოსტა: {user.email}</Info>
            <Info>კორპ: {user.campus} / ბინა: {user.no}</Info>
            <Info>პირადი ნო: {user.idNumber}</Info>
        </>
    </InfoDiv>);
}

export default Index;
