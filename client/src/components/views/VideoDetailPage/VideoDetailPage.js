import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'

function VideoDetailPage(props) {

  const [videoDetail, setVideoDetail] = useState([])

  useEffect(() => {
    let variable = { videoId: props.match.params.videoId }
    Axios.post('/api/video/getVideoDetail', variable)
      .then(response => {
        if (response.data.success) {
          setVideoDetail(response.data.videoDetail)
        } else {
          alert('비디오 정보를 가져오지 못했습니다.')
        }
      })
    
  }, [])

  if (!videoDetail.writer) {
    return (<div> L O A D I N G </div>)
  } else {

    const subscribeButton = videoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={videoDetail.writer._id}/>

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls/>
  
            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={videoDetail.writer.image}
                title={videoDetail.writer.name}
                description={videoDetail.description}/>
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo/>
        </Col>
      </Row>
    )
  }  
}

export default VideoDetailPage
