import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import logo from '../../../static/img/logo-dark.svg';

import BlockContent from '../block-content';

import styles from './special-offers.module.css';

const SpecialOffer = ({ title, discount, subtext, multiline }) => <div className={styles.container}>
    <div>
        <div className={styles.header}>
            <div className={styles.logo}><img src={logo} alt="Metro Pest Logo"/></div>
            <h4 className={styles.title}>{title}</h4>
        </div>
    </div>
    <div className={cn(styles.discount, {
        [styles.multiline]: multiline
    })}>{discount.split(",").map(text => <div>{text}</div>)}</div>
    <div className={styles.subtext}>{subtext}</div>
</div>;

SpecialOffer.propTypes = {
    title: PropTypes.string,
    discount: PropTypes.string,
    subtext: PropTypes.string,
    multiline: PropTypes.bool,
};

export default SpecialOffer;