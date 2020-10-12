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

  const onSubscribe = () => {
    let variable = { userTo: props.userTo , userFrom: localStorage.getItem('userId') }
    if (subscribed) {
      Axios.post('/api/subscribe/unsubscribe', variable)
      .then(response => {
        if (response.data.success) {
          setNumber(number - 1)
          setSubscribed(false)
        } else {
          alert('구독 취소에 실패했습니다.')
        }
      })
    } else {
      Axios.post('/api/subscribe/subscribe', variable)
      .then(response => {
        if (response.data.success) {
          setNumber(number + 1)
          setSubscribed(true)
        } else {
          alert('구독에 실패했습니다.')
        }
      })
    }
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? 'gray' :  '#CC0000'}`,
          borderRadius: '4px', color: 'white', padding: '10px 16px',
          fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',
          cursor: 'pointer'
        }}
        onClick={onSubscribe}>
          {number} { subscribed ? 'Subscribed' : 'Subscribe' }
      </button>
    </div>
  )
}

export default Subscribe
