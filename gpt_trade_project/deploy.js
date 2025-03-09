const ghpages = require('gh-pages');
const path = require('path');

console.log('Starting deployment to GitHub Pages...');

ghpages.publish(
  path.join(process.cwd(), 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Zsaad7/GPTTrade.git',
    message: 'Auto-generated commit from deploy script',
    dotfiles: true, // Include .nojekyll file
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
      return;
    }
    console.log('Deployment successful!');
  }
); 