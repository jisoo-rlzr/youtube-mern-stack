import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {

  const [number, setNumber] = useState(0)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    Axios.post('/api/subscribe/subscribeNumber', { userTo: props.userTo })
      .then(response => {
        if (response.data.success) {
          setNumber(response.data.subscribeNumber)
        } else {
          alert('구독자 수를 가져오지 못했습니다.')
        }
      })

    Axios.post('/api/subscribe/subscribed', { userTo: props.userTo, userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed)
        } else {
          alert('구독 여부를 가져오지 못했습니다.')
        }
      })
  }, [])

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? 'gray' :  '#CC0000'}`,
          borderRadius: '4px', color: 'white', padding: '10px 16px',
          fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
        }}>
          {number} { subscribed ? 'Subscribed' : 'Subscribe' }
      </button>
    </div>
  )
}

export default Subscribe
