/**
 * Created by yaoyi on 17/4/19.
 */
import React,{Component,PropTypes} from 'react';
import cn from 'classnames';
import s from './index.less'
import Svg from '../svg';

export default class Checkbox extends Component{
    static propTypes={
        value:PropTypes.bool.isRequired,
        onChange:PropTypes.func,
        disabled:PropTypes.bool,
        className:PropTypes.string
    };
    static defaultProps={
        value:false,
        onChange:null,
        disabled:false,
        className:''
    };
    constructor(props){
        super(props);

        this.state={
            value:props.value
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value!==this.state.value){
            this.setState({value:nextProps.value});
        }
    }
    _onClick(e){
        const {disabled,onChange}=this.props;
        const {value}=this.state;
        if(!disabled){
            (typeof onChange=='function')&&onChange(!value,e);
        }
    }
    render(){
        const {className,disabled}=this.props;
        const {value}=this.state;
        return (
            <div
                className={cn(s.root,className)}
                onClick={this._onClick.bind(this)}
            >
                <Svg.CheckboxUnchecked
                    className={cn(disabled&&s.disabled)}
                />
                <Svg.CheckboxChecked
                    className={cn(s.hidden,disabled&&s.disabled,value&&s.visible)}
                />
            </div>
        );
    }
}