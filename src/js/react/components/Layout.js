import Footer from './layouts/Footer';
import Header from './layouts/Header';

export default class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "CRUN 1.0.0"
    };
  }

  render(){
    return (
      <div>
        <Header title={this.state.title}/>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
