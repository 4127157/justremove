import * as React from 'react';

interface Props {
   name:string
}

class App extends React.Component<Props> {
    
    render(): JSX.Element {
        const { name } = this.props;
        return (
            <>
                <h1>
                Hello {name}
                </h1>
            </>
        );
    }
}

export default App;
