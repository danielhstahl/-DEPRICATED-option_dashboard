import React from 'react'
import { Collapse } from 'antd'
const Panel = Collapse.Panel

export default ({parameters})=>(
    <Collapse bordered={false} >
        <Panel header="Show Raw Json" key="1">
            <pre>
                <code>
                    {JSON.stringify(parameters, null, 2)}
                </code>
            </pre>
        </Panel>
    </Collapse>
)
