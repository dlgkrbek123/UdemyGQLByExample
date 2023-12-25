import { connection } from './connection.js';
import DataLoader from 'dataloader';

const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

// 정렬맞춰서 리턴
// 근데 캐싱이 된다 => 문제가 될수도 있음
// 매요청마다 DataLoader인스턴스 생성

export const createCompanyLoader = () => {
  return new DataLoader(async (ids) => {
    const companies = await getCompanyTable().select().whereIn('id', ids);

    return ids.map((id) => companies.find((company) => company.id === id));
  });
};
