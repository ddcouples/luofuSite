import React from 'react';
import { rand } from '../tools/tools';
require('../scss/svgText.scss');
class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
    this.textAnimate = this.textAnimate.bind(this);
  }
  componentWillMount() {
    var texts=this.props.text.split('').map((v,i)=>{
    	return {
    		name:v,
    		color:'hsl('+360/this.props.text.length*(i+1)+','+rand(40,90)+'%,'+rand(50,80)+'%)',
            fill:'none',
            strokeDashoffset:1000
    	}
    })
    this.state.texts=texts;
  }  
  componentDidMount() {
    this.textAnimate();
  }  
  textAnimate() {
  	var that = this;
  	var ts=this.state.texts
  	ts.forEach((v,i) => {
  		setTimeout(()=>{
  		  v.strokeDashoffset=0;
  		  that.setState({
  		  	texts:ts
  		  })
  		  setTimeout(()=>{
  		  	v.fill=v.color;
          that.setState({
	  		  	texts:ts
	  		  })
          if(i==ts.length-1){
            this.props.textAnimateEnd();
          }  		  	
  		  },3000)
  		},3000*(i)+500);
  	})
  }
  render() {
    return (
		<div className="text-center">
		  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="50,100,700,200">
		    <path id="path" d="M50,300A400,200,0,0,1,750,300" stroke="null" fill="none"></path>
		  	<text style={{fontSize:'100px'}} dx="20 20 20 20 20" textAnchor="middle">
		  	   <textPath dominantBaseline="middle" startOffset="50%" xlinkHref="#path"> 
		  	       {this.state.texts.map((v,i)=>{
		  	       	 return ( <tspan key={i} strokeWidth={2} strokeDashoffset={v.strokeDashoffset} fill={v.fill} stroke={v.color}>{v.name}</tspan>)
		  	       })}
		  	   </textPath>
		  	</text>
		  </svg>
		</div>    
    );
  }
}

Text.defaultProps = {
};

export default Text;