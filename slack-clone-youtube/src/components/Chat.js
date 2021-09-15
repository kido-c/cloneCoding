import React, {useRef, useEffect} from 'react'
import styled from 'styled-components'

import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { selectRoomId } from '../features/counter/appSlice';
import { useSelector } from 'react-redux';
import { useCollection, useDocument} from 'react-firebase-hooks/firestore'

import Message from './Message'
import ChatInput from './ChatInput'
import { db } from '../firebase';


function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timetamp","asc") // 망할... timestamp를 timetamp로 해놔서 못가져왔던것...
    )
    console.log(roomDetails?.data())
    console.log(roomMessages?.docs) // 다시한번 콘솔로그의 소중함을...

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth" // 부드럽게
        })
    }, [roomId, loading]) // 채팅방 들어갔을 때 제일 최신 대화로/ 제일 밑으로 스크롤을 내려주는 메소드

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#{roomDetails?.data().name}</strong>
                    </h4>
                    <StarBorderIcon/>
                </HeaderLeft>
                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon/> Dtails
                    </p>
                </HeaderRight>
                </Header>

                <ChatMessages>
                {roomMessages?.docs.map((doc) => {
                    const {message, timetamp, user, userImage} = doc.data()
                        return (
                        <Message 
                        key={doc.id} 
                        message={message} 
                        timetamp={timetamp} 
                        user={user} 
                        userImage={userImage} 
                        />
                        )
                    })}
                    <ChatBottom ref={chatRef}/>
                </ChatMessages>
                <ChatInput 
                chatRef={chatRef}
                channelName = {roomDetails?.data().name}
                channelId={roomId}
                />
                </>
            )}
        
        </ChatContainer>
    )
}

export default Chat

const ChatBottom = styled.div`
    padding-bottom: 200px;
`

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    >h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root{
        margin-left: 20px;
        font-size: 18px;
    }
`
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px
    }

    > p > .MuiSvgIcon-root{
        margin-left: 5px !important;
        font-size: 16px;
    }
`

const ChatMessages = styled.div`
`