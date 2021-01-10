import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

import MFLogo from '../../svg/maple-pizza-logo.svg'


const styles = {
    maplePizza: {
        width: 90,
        position: 'fixed',
        left: 10,
        bottom: 10,
        cursor: 'pointer',
    },
    nameLinkedid: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 25,
        textDecoration: 'none',
        color: 'var(--tiffany-extra-dark)',
        margin: 5,
    },
    textInModal: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 20,
        color: '#999595',
    }

}

const modalStyles = {
    content: {
        background: 'white',
        borderRadius: 5,
        padding: 10,
        position: 'fixed',
        top: 'auto',
        right: 'auto',
        left: 10,
        bottom: 100,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        boxShadow: '0px 1px 2px #0006',
        borderColor: 'transparent',
    },
    overlay: {
        zIndex: 1,
        backgroundColor: 'transparent',
    },
}

class LogoPopup extends React.Component {
    state = {
        isOpen: false,
    }

    close = () => {
        this.setState({ isOpen: false })
    }

    open = () => {
        this.setState({ isOpen: true })
    }

    render() {
        const { classes } = this.props

        return <Fragment>
            {/* I like it  miao <3*/}
            <MFLogo
                className={classes.maplePizza}
                onClick={this.open} />
            <Modal
                isOpen={this.state.isOpen}
                style={modalStyles}
                onRequestClose={this.close}
            >
                <div className={classes.textInModal}>Created by:</div>
                <a
                    className={classes.nameLinkedid}
                    href='http://linkedin.com/in/marcel-robitaille'>
                    Marcellino
                </a>
                <div className={classes.textInModal}>&</div>
                <Link
                    className={classes.nameLinkedid}
                    to='/fede'
                // Fede's linkedin:
                // href='http://www.linkedin.com/in/federica-tomola-44124a184/'>
                >
                    Federchicca
                </Link>
            </Modal>
        </Fragment>
    }
}

LogoPopup.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LogoPopup)