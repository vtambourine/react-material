import React from 'react';
import Button from 'Button';

import './index.scss';

class Page extends React.Component {

    render() {
        return (
            <div className="Page">
                <header>
                    <h1>React UI Library</h1>
                </header>
                <div className="Page--body">
                    <section className="Example">
                        <h2 className="Example--title">
                            Button
                        </h2>
                        <div className="Example--example">
                            <Button>Large button</Button>
                        </div>
                        <div className="Example--code">
                            {`
                                <Button>Large button</Button>
                            `}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

}

React.render(<Page />, document.body);
