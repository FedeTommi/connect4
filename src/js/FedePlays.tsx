import React from 'react'
import { createUseStyles } from 'react-jss'

import FedeDrawing from '../svg/fede_drawing_.svg'

const useStyles = createUseStyles({
    background: {
        height: '100%',
        width: '100%',
        display: 'flex',
        // flexDirection: 'column',   
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    drawing: {
        height: '100%',
        width: 'auto',
        // paddingLeft: 20,
        paddingTop: 20,
        // paddingBottom: 20,
    }
})

const FedePlays = () => {
    const classes = useStyles()

    return <div className={classes.background}>
        <FedeDrawing className={classes.drawing}/>
    </div>

}


export default FedePlays