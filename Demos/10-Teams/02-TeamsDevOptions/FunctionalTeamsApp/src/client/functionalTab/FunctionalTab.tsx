import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * Implementation of the FunctionalTab content page
 */
export const FunctionalTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.entityId);
        }
    }, [context]);

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Provider theme={theme}>
            <Flex fill={true} column styles={{
                padding: ".8rem 0 .8rem .5rem"
            }}>
                <Flex.Item>
                    <Header content="This is your tab" />
                </Flex.Item>
                <Flex.Item>
                    <div>
                        <div>
                            <Text content={entityId} />
                        </div>

                        <div>
                            <Button onClick={() => alert("It worked!")}>A sample button</Button>
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="(C) Copyright Integrations" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
