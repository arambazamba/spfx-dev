import axios from 'axios';
import { Voucher } from './Voucher';
import { Skill } from './skill.model';

export class ServicesDemos {
    apiurl = 'http://localhost:3000/skills';

    usingFetch() {
        fetch(this.apiurl)
            .then<Skill[]>((resp: Response) => {
                console.log('Response received from fetch:', resp);
                return resp.json();
            })
            .then((data: Skill[]) => {
                console.log('Data received from fetch:', data);
            });
    }

    postFetch() {
        let skill = {
            name: 'DevOps',
            completed: true,
        };

        let options = {
            method: 'POST',
            body: JSON.stringify(skill),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(this.apiurl, options)
            .then(function (res) {
                if (res.ok) {
                    return res.statusText;
                } else {
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    postAxios() {
        let skill = {
            name: 'DevOps',
            completed: true,
        };

        axios.post(this.apiurl, skill).then((response) => {
            console.log('response received:', response);
        });
    }

    usingFetchAwait() {
        async function getAllSkills() {
            let response = await fetch(this.url);
            let skills = await response.json();
            console.log('Data received using fetch - await: ', skills);
        }

        getAllSkills();
    }

    usingPromises() {
        //Mocking a promise function
        function getMockPromise(data: any): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    console.log('Async Task Complete');
                    if (true) {
                        resolve(JSON.stringify({ Id: 1, Person: 'Hugo Wolf' }));
                    } else {
                        // reject("Big Error: Promise rejected");
                    }
                }, 1000);
            });
        }

        getMockPromise('Hello World')
            .then((data) => console.log('Date received from getMockPromise', data))
            .catch((err) => console.log('Err:', err));
    }

    chainingPromises() {
        debugger;

        function popFirstAsync(data: Voucher[]): Promise<Voucher[]> {
            return new Promise<Voucher[]>((resolve, reject) => {
                setTimeout(() => {
                    console.log('popFirstAsync() received data', data);
                    if (true) {
                        resolve(data.slice(1, data.length));
                    } else {
                        // Commented out because unreachable
                        // reject("Big Error: Promise rejected");
                    }
                }, 1000);
            });
        }

        axios
            .get(this.apiurl)
            .then((resp) => popFirstAsync(resp.data))
            .then((data) => console.log('data from chaining', data));

        console.log('chainingPromises() finished');
    }

    consumeService() {
        var service = new VoucherService();
        service.getVouchers().then((data: Voucher[]) => {
            console.log('Data from VoucherService ', data);
        });
    }
}

export class VoucherService {
    getVouchers(): Promise<Voucher[]> {
        let url = './src/vouchers.json';

        return new Promise<Voucher[]>((resolve, reject) => {
            fetch(url)
                .then((data) => {
                    resolve(data.json());
                })
                .catch((err) => {
                    console.log('error calling service');
                    console.log(err);
                    return reject(err);
                });
        });
    }
}
