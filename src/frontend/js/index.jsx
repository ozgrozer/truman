import React from 'react'
import ReactDOM from 'react-dom'
/* import { webFrame } from 'electron' */

import ajax from './function/ajax'
import './../css/style.scss'

/* webFrame.setZoomLevelLimits(1, 1)
webFrame.setVisualZoomLevelLimits(1, 1) */

const formItems = {
  url: 'https://youtube.com',
  downloadPath: window.defaults.downloadPath,
  viewportWidth: window.screen.width,
  viewportHeight: window.screen.height
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      formItems: {
        url: formItems.url,
        downloadPath: formItems.downloadPath,
        viewportWidth: formItems.viewportWidth,
        viewportHeight: formItems.viewportHeight
      },
      buttonTitle: 'Download',
      isFormDisabled: false
    }
  }

  returnFalse (e) {
    e.preventDefault()
  }

  onSubmit (e) {
    e.preventDefault()

    if (
      this.state.formItems.url &&
      this.state.formItems.downloadPath &&
      this.state.formItems.viewportWidth &&
      this.state.formItems.viewportHeight
      ) {
      this.setState({
        buttonTitle: 'Downloading...',
        isFormDisabled: true
      })

      ajax({
        url: '/download',
        type: 'post',
        query: this.state.formItems
      })
        .then((result) => {
          this.setState({
            url: '',
            buttonTitle: 'Download',
            isFormDisabled: false
          })
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            buttonTitle: 'Download',
            isFormDisabled: false
          })
        })
    }
  }

  onChange (e) {
    const item = e.target
    const formItems = this.state.formItems

    if (item.name === 'viewportWidth' || item.name === 'viewportHeight') {
      formItems[item.name] = parseInt(item.value)
    } else {
      formItems[item.name] = item.value
    }

    this.setState({
      formItems: formItems
    })
  }

  render () {
    return (
      <div>
        <div id='drag' onMouseDown={this.returnFalse}>
          {window.defaults.name}
        </div>

        <div id='scroll'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <fieldset disabled={this.state.isFormDisabled}>
              <div className='form-group'>
                <label htmlFor='url'>URL</label>
                <input
                  id='url'
                  name='url'
                  type='text'
                  className='form-control'
                  placeholder={formItems.url}
                  value={this.state.formItems.url}
                  onChange={this.onChange.bind(this)}
                  />
              </div>

              <div className='form-group'>
                <label htmlFor='downloadPath'>Download path</label>
                <input
                  type='text'
                  id='downloadPath'
                  name='downloadPath'
                  className='form-control'
                  onChange={this.onChange.bind(this)}
                  placeholder={formItems.downloadPath}
                  value={this.state.formItems.downloadPath}
                  />
              </div>

              <div className='form-group'>
                <label htmlFor='viewportWidth'>Viewport width/height</label>
                <div className='form-row'>
                  <div className='col'>
                    <input
                      type='text'
                      id='viewportWidth'
                      name='viewportWidth'
                      className='form-control'
                      onChange={this.onChange.bind(this)}
                      placeholder={formItems.viewportWidth}
                      value={this.state.formItems.viewportWidth}
                      />
                  </div>

                  <div className='col'>
                    <input
                      type='text'
                      id='viewportHeight'
                      name='viewportHeight'
                      className='form-control'
                      onChange={this.onChange.bind(this)}
                      placeholder={formItems.viewportHeight}
                      value={this.state.formItems.viewportHeight}
                      />
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <button className='btn btn-primary btn-block'>
                  {this.state.buttonTitle}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
