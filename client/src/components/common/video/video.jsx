import React, { PureComponent } from 'react';
import helpers from './helpers';

class Video extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    helpers.call(this);
  }

  componentDidUpdate() {
    if (this.props.maximized) this.openFullscreen(this.containerRef.current);
    else this.closeFullscreen();
  }

  render() {
    const {
      children,
      className = '',
      srcObject,
      muted,
      videoStyle = {}
    } = this.props;

    return (
      <div className={'video_container ' + className} ref={this.containerRef}>
        <div className='video_wrapper'>
          <video
            ref={video =>
              video && srcObject && this.setStream(video, srcObject)
            }
            muted={!!muted}
            autoPlay
            style={videoStyle}></video>
        </div>
        {children}
      </div>
    );
  }
}

export default Video;
