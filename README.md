# EduCards: Interactive Learning Platform

## Overview

EduCards is a comprehensive learning platform that combines a React-based frontend with a Django backend, designed to provide an engaging flashcard learning experience.

## Project Structure

- React frontend
- Django backend

## Features

- 🃏 Interactive Flashcards
- 🔄 Smooth Card Transitions
- 🔀 Shuffle Functionality
- 📱 Responsive Design
- 🎨 Animated User Interface

## Tech Stack

- React
- TypeScript
- React Spring
- Zustang
- Leva

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Development Workflow

1. Backend: `http://localhost:8000`
2. Frontend: `http://localhost:3000`

## Troubleshooting

- Ensure all dependencies are installed
- Check that virtual environment is activated
- Verify Python and Node.js versions

## Known Issues

- Initial card loading might have a slight delay
- Ensure backend is running before starting frontend
- Some browsers may require additional config

## Future Roadmap

- [x] Add chat overlay
- [ ] Add user auth
- [x] Implement card creation feature
- [x] Add multiple deck support
- [ ] Create progress tracking system
- [ ] Implement varying levels of difficulty for cards
- [x] Add Document Upload

## Performance Optimization

- Lazy loading of components
- Efficient state management with Jotai
- Minimized re-renders
- Optimized Django queries

## Security Considerations

- Use environment variables for sensitive information
- Implement proper CORS settings
- Use Django's built-in security features
- Validate and sanitize user inputs