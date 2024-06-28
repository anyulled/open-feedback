import { object, string } from 'yup'
import { Form, Formik } from 'formik'
import { FormikObserver } from '../../baseComponents/form/formik/FormikObserver'
import OFFormControlInputFormiked from '../../baseComponents/form/formControl/OFFormControlInputFormiked'
import Button from '@material-ui/core/Button'
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Collapse from '@material-ui/core/Collapse'
import OFButton from '../../baseComponents/button/OFButton'
import clipboardCopy from 'clipboard-copy'
import jsonModel from './jsonmodel.json'
import Box from '@material-ui/core/Box'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
    jsonShowButton: {
        width: '100%',
    },
    jsonExample: {
        background: '#EEE',
        padding: 12,
        marginTop: 32,
    },
    jsonExamplePre: {
        overflow: 'auto',
    },
    jsonExampleInnerContainer: {
        position: 'relative',
    },
    jsonCopyButton: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
}))

const SetupSessionizeForm = ({
    backText,
    onBack,
    onFormChange,
    onSubmit,
    submitText,
    initialValues,
}) => {
    const classes = useStyles()
    const [isExampleOpen, setExampleOpen] = useState(false)
    const { t } = useTranslation()
    return (
        <Formik
            validationSchema={object().shape({
                sessionizeUrl: string()
                    .url(t('settingsSetup.json.sessionizeUrlValid'))
                    .required(t('settingsSetup.json.sessionizeUrlRequired')),
            })}
            initialValues={initialValues}
            onSubmit={(values) =>
                onSubmit({
                    sessionizeUrl: values.sessionizeUrl,
                })
            }
        >
            {({ isSubmitting, values }) => (
                <Form method="POST">
                    {onFormChange && (
                        <FormikObserver
                            value={values}
                            onChange={(values) => onFormChange(values)}
                        />
                    )}
                    <OFFormControlInputFormiked
                        name={t('settingsSetup.json.fieldSessionizeUrl')}
                        fieldName="sessionizeUrl"
                        type="text"
                        isSubmitting={isSubmitting}
                    />

                    <div className={classes.jsonExample}>
                        <Button
                            className={classes.jsonShowButton}
                            onClick={() => setExampleOpen(!isExampleOpen)}
                        >
                            {t('settingsSetup.json.showJsonModel')}{' '}
                            <ArrowDownIcon />
                        </Button>
                        <Collapse
                            in={isExampleOpen}
                            className={classes.jsonExampleInnerContainer}
                        >
                            <OFButton
                                style={{ design: 'text' }}
                                variant="outlined"
                                className={classes.jsonCopyButton}
                                onClick={() =>
                                    clipboardCopy(
                                        JSON.stringify(jsonModel, undefined, 4)
                                    )
                                }
                            >
                                {t('common.copy')}
                            </OFButton>
                            <pre className={classes.jsonExamplePre}>
                                {JSON.stringify(jsonModel, undefined, 4)}
                                <br />
                                Required fields:
                                <br />
                                - session.title
                                <br />
                                - session.id
                                <br />- speakers: {'{}'}
                                <br />
                                Optional fields: all others
                            </pre>
                        </Collapse>
                    </div>

                    <Box justifyContent="space-between" display="flex">
                        {backText && (
                            <OFButton
                                disabled={isSubmitting}
                                onClick={() => onBack(values)}
                                style={{
                                    type: 'big',
                                    design: 'text',
                                    marginTop: 64,
                                }}
                            >
                                {backText}
                            </OFButton>
                        )}

                        {submitText && (
                            <OFButton
                                disabled={isSubmitting}
                                type="submit"
                                style={{ type: 'big', marginTop: 64 }}
                            >
                                {submitText}
                            </OFButton>
                        )}
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default SetupSessionizeForm
