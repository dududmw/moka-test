/**
 * Created by yaoyi on 17/4/19.
 */
import React,{Component,PropTypes} from 'react';
import cn from 'classnames';
import s from './index.less'
export default class Basic extends Component{
    static propTypes={
        className:PropTypes.string,
        style:PropTypes.object
    };
    static defaultProps={
        className:'',
        style:null
    };
    render(){
        const {className,style}=this.props;
        return (
            <svg
                className={cn(s.root,className)}
                viewBox="0 0 24 24"
                style={style}
            >
                {this.props.children}
            </svg>
        );
    }
}