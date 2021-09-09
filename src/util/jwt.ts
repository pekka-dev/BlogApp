import jwt from 'react-native-pure-jwt';

const privateKey =
  'j4ZloVjGgN1vrzpbUxgeN1+kU2BqUtogjIc6oZIbUmuhsDK8trXXv+wCdVy+H7ZtaRiyvaaJh2pv9ccL2S9o0Su3WWdRiIfsv96ZKfui4RcvJxZE022usPk83MF4/AuyvxwtbYlIMw/dLuy0uHZqAvm91saYSD8kBCtmrxmdDiYa9QBpASn+O+B2mTeIbkkEOLTXP5v+7ZOog4MIg30yrvALGa74tUrEl4krJF6DJ68CRPaUFpZEdwsdyAbxH1dGG5DDic87VsAg2JwXUnQ1cSTcgwwH8w2tbEnrsKdrrFjvep79bQapuu92twHtzVkiZpvbiS2AhStxNIPhlDVKrugCFtaKgR1FVewNrMtuZt7UHvoFRqkzRPkO0sHEhLr/PeoEDQU2u55lLtQzW9+KbkK0v7UC1zeXn9opVedxP5QR3cV8TopDevqLLgs7MIl75PUxU5e49LcaUF+NfdMgNGV66ZLeMv0IVWw0D950srg9fQFkfyS+RRzKUI9YbZBT';

export function createJwt<T extends object>(data: T) {
  return jwt.sign(data, privateKey, {
    alg: 'HS256',
  });
}
