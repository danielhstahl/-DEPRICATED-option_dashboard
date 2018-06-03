import React from 'react'
import { Collapse } from 'antd'
import {mapStateToProps} from '../reduxInjections'
import {PARAMETERS} from '../../Utils/constants'
import { connect } from 'react-redux'
import {generateConvertSpecificToAdvanced} from '../../Utils/conversionUtils'
const Panel = Collapse.Panel
const noBorder={border: 0}
export default connect(mapStateToProps)(({model, ...form})=>(
    <Collapse bordered={false} >
        <Panel header="Show Raw Json" key="1" style={noBorder} >
            <pre>
                <code>
                    {JSON.stringify(
                        generateConvertSpecificToAdvanced(
                            model
                        )(
                            form[model+PARAMETERS]
                        ), null, 2
                    )}
                </code>
            </pre>
        </Panel>
    </Collapse>
))
