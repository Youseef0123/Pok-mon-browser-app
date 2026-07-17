import { Component, type ReactNode } from 'react'

// TODO: implement ErrorBoundary logic
export default class ErrorBoundary extends Component<{ children: ReactNode }> {
  render() {
    return this.props.children
  }
}
