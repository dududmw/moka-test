/**
 * Created by yaoyi on 17/4/19.
 */
import React,{Component,PropTypes} from 'react';
import cn from 'classnames';
import Basic from '../basic';
import {antiAssign} from 'util';
export default class ArrowDown extends Component{
    render(){
        return (
            <Basic
                {...antiAssign(this.props,'children')}
            >
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
            </Basic>
        );
    }
}