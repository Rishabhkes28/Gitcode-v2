const user = args[0];
const contributor = args[1];
const repo = args[2];
const pullNumber = args[3];

const githubRequest = Functions.makeHttpRequest({
  url: `https://api.github.com/repos/${user}/${repo}/pulls/${pullNumber}`,
});

const githubResponse = await githubRequest;

if (githubResponse.error) {
  console.log('GitHub Error:', githubResponse.error);
  return Functions.encodeUint256(0);
}

const {
  merged_at,
  state,
  user: { login },
} = githubResponse.data;

if (merged_at && state === 'closed' && login === contributor) {
  return Functions.encodeUint256(1);
}

return Functions.encodeUint256(0);
