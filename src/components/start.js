
require('../scss/start.scss');

import React from 'react';
import Screen from './screen.js'
import Text from './text.js'
import MechanicsSvg from './MechanicsSvg'
import Nightsky from './nightSky'

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    	start:false,
    	trans_pos:-300,
      isRender:true,
      textRender:false
    }
    this.lightMouseEnter = this.lightMouseEnter.bind(this);
    this.moveStart = this.moveStart.bind(this);
    this.lightmove = this.lightmove.bind(this);
    this.moveEnd = this.moveEnd.bind(this);
    this.screenAnimateEnd = this.screenAnimateEnd.bind(this);
    this.textEnd = this.textEnd.bind(this);

  }
  lightMouseEnter() {
  	const cl_name=this.lightTaggle.className;
  	if(cl_name.indexOf('light-before-after')>-1){
  		this.lightTaggle.className = this.lightTaggle.className.replace(' light-before-after','');
  	}else{
  		this.lightTaggle.className += ' light-before-after';  		
  	}
  }
  moveStart() {
  	this.setState({
  	   start:true
  	})
  }
  lightmove(e) {
  	if(this.state.start){
  		let _pageY=e.clientY;
  		if(!_pageY){
  			_pageY=e.touches[0].pageY;
  		}
  		let pageY = _pageY+document.documentElement.scrollTop-document.documentElement.clientTop;
  		let lightToggle_btm=this.lightTaggle.getBoundingClientRect().bottom;
  		let _offset=pageY-lightToggle_btm;
  		if(_offset>0&&this.state.trans_pos<-100){
			this.setState({
		  	   trans_pos:this.state.trans_pos+_offset
		  	});
		  	if(this.state.trans_pos>-150){
		  		console.log('open_light')
		  	}
		}
  	}
  }
  moveEnd() {
    this.setState({
  		start:false,
  		trans_pos:-300
  	});
  }
  screenAnimateEnd() {
    this.setState({
      isRender:false
    })
  }
  componentDidMount() {
    
  }
  textEnd(){
    this.setState({
      textRender:true
    })
  }
  /*
        
  */

  render() {
    return (
      <div className="full-screen bg-black" onMouseMove={this.lightmove}
           onMouseUp={this.moveEnd}  onTouchEnd={this.moveEnd}
           onTouchMove={this.lightmove}>
        <Nightsky></Nightsky>
        {this.state.textRender ? <MechanicsSvg text="XunBaoLuoFuZhen"></MechanicsSvg>: null}
        {!this.state.isRender ? <Text text="寻宝罗敷镇" textAnimateEnd={this.textEnd}></Text>: null}
        {this.state.isRender ? <Screen animateEnd={this.screenAnimateEnd} /> : 
          ( 
            <div  className="light" style={{transform: 'translateY('+this.state.trans_pos+'px)'}}>
              <div className="light-line"></div>
              <div className="light-open light-before-after" onMouseDown={this.moveStart}
                   onTouchStart={this.moveStart}
                 ref={(light)=>{this.lightTaggle=light;}} onMouseLeave={this.lightMouseEnter}
                   onMouseEnter={this.lightMouseEnter}></div>
            </div>)}       
      </div>
    );
  }
}

StartPage.defaultProps = {
};

export default StartPage;