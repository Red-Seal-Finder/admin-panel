"use client"
import React, { useState } from 'react'
import Header from '../layout/header/header'
import PageBody from '../shared/page-body/page-body'
import PageHeading from '../shared/page-body/page-heading'
import LoadingTemplate from '../layout/loading';
import NotificationBox from './components/box'
import warning from "@/public/warning.svg";
import money from '@/public/money.svg'
import verified from '@/public/round-verified.svg'

function Notification() {
    const [loading, setLoading] = useState(true);
    
  return (
    <div>
        <Header />
        {/* {loading && <LoadingTemplate />} */}
        <PageBody>
            <div className="flex justify-between mb-6 items-center">
                <PageHeading page_title="Notifications" />
                <p className="text-center text-sm font-semibold underline">Mark all as read</p>
            </div>
            <div>
                <NotificationBox 
                    imgSrc={money} 
                    title='Payment Received!'
                    date='28th July, 2023'
                    info='Customer just paid for a job.'
                />
                <NotificationBox 
                    imgSrc={warning} 
                    title='Attention!'
                    date='28th July, 2023'
                    info='There is a dispute between a contractor and customer. please send an RF representative.'
                />
                <NotificationBox 
                    imgSrc={warning} 
                    title='Attention!'
                    date='28th July, 2023'
                    info='There is a dispute between a contractor and customer. please send an RF representative.'
                />
                <NotificationBox 
                    imgSrc={money} 
                    title='Payment Received!'
                    date='28th July, 2023'
                    info='Customer just paid for a job.'
                />
                <NotificationBox 
                    imgSrc={money} 
                    title='Payment Received!'
                    date='28th July, 2023'
                    info='Customer just paid for a job.'
                />
                <NotificationBox 
                    imgSrc={verified} 
                    title='Well done!'
                    date='28th July, 2023'
                    info='You just successfully published a skill.'
                />
                <NotificationBox 
                    imgSrc={warning} 
                    title='Attention!'
                    date='28th July, 2023'
                    info='There is a dispute between a contractor and customer. please send an RF representative.'
                />
                <NotificationBox 
                    imgSrc={verified} 
                    title='Well done!'
                    date='28th July, 2023'
                    info='You just successfully published a skill.'
                />
            </div>
        </PageBody>
    </div>
  )
}

export default Notification