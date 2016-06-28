
import React, { PropTypes } from 'react';

const Footer = ({ N, fps }) => (
    <div style={{bottom: 0}} className="d3particles.footer">
        <strong>{N} particles</strong>
    </div>
);

Footer.propTypes = {
    N: PropTypes.number.isRequired
};

export default Footer;
