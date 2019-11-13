import React from 'react';

import SpecialOffer from './special-offer';

import styles from "./special-offers.module.css";
import { small } from '../typography.module.css';

const SpecialOffers = ({ data }) => <div className={styles.list}>
    {data.edges.map(edge => <SpecialOffer key={edge.node.title} {...edge.node} /> ) }
    <p className={small} style={{ margin: "25px 25px 0" }}>To use a coupon, mention the offer when speaking to a Metro Pest representative to have the discount applied to your service.</p>
</div>;

export default SpecialOffers;