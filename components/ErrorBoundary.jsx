import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.errorText}>{this.state.error && this.state.error.toString()}</Text>
          <Text style={styles.errorInfo}>{this.state.errorInfo && this.state.errorInfo.componentStack}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#721c24',
  },
  errorText: {
    color: '#721c24',
    marginBottom: 5,
    textAlign: 'center',
  },
  errorInfo: {
    color: '#721c24',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ErrorBoundary;
