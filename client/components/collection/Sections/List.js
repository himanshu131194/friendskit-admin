import React, {Component, Fragment} from 'react'

class List extends Component{
      render(){
      	return(
          <Fragment>
<div className="bd bd-gray-300 rounded table-responsive mg-t-10">
            <table className="table mg-b-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>$320,800</td>
                  <td>$320,800</td>

                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>$170,750</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Ashton Cox</td>
                  <td>Junior Technical Author</td>
                  <td>$86,000</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Cedric Kelly</td>
                  <td>Senior Javascript Developer</td>
                  <td>$433,060</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Airi Satou</td>
                  <td>Accountant</td>
                  <td>$162,700</td>
                  <td>$320,800</td>
                </tr>
              </tbody>
            </table>
          </div>
          </Fragment>
        )
      }
}

export default List;






