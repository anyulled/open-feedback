import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import SetupJSONForm from './SetupJSONForm'
import SetupValidationContainer from './validation/SetupValidationContainer'
import { PROJECT_TYPE_SESSIONIZE } from '../../../core/setupType/projectApi'
import SessionizeAPI from '../../../core/setupType/sessionize/SessionizeApi'

const SetupSessionize = ({
    initialValues,
    submitText,
    backText,
    onSubmit,
    onBack,
}) => {
    const [formChangeValues, setFormChangeValues] = useState(null)
    const formValues = formChangeValues || initialValues
    const isFieldNotEmpty = formValues && formValues.sessionizeUrl

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5">Sessionize</Typography>
                <SetupJSONForm
                    submitText={submitText}
                    backText={backText}
                    onSubmit={onSubmit}
                    onBack={onBack}
                    initialValues={initialValues}
                    onFormChange={(values) => {
                        setFormChangeValues(values)
                    }}
                />
            </Grid>
            {isFieldNotEmpty && (
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom>
                        What Do I put here?
                    </Typography>
                    <SetupValidationContainer
                        setupType={PROJECT_TYPE_SESSIONIZE}
                        api={new SessionizeAPI(formValues)}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default SetupSessionize
