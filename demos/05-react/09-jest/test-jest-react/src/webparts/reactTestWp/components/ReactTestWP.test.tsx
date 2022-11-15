/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { IReactTestWpProps } from './IReactTestWpProps';
import ReactTestWp from './ReactTestWp';

describe('Hello Tests', () => {
    let reactComponent: ReactWrapper<IReactTestWpProps, {}>;

    afterEach(() => {
        reactComponent.unmount();
    });

    it('should root web part element exists', () => {
        reactComponent = mount(React.createElement(
            ReactTestWp,
            {
                description: 'Description property value'
            }
          ));
        let cssSelector: string = '.reactTestWp';

        const element = reactComponent.find(cssSelector);
        expect(element.length).toBeGreaterThan(0);
    });
});