import { QueryHookOptions, QueryHookResult, useQuery } from 'react-apollo-hooks';
import { DocumentNode } from 'graphql';
import { OperationVariables } from 'apollo-client';

// export const queryHookFactory = <TData, TVariables extends OperationVariables>(
//   query: DocumentNode,
//   options?: {
//     transformData?: {
//       name: string;
//       propName: string;
//     }
//     resolveData?: (result: QueryHookResult<TData, TVariables>) => any;
//   }
// ) => {
//   return () => {
//     const result = useQuery(query);
//     const { data, ...rest } = result;
//
//     if (!options) {
//       return { ...result };
//     }
//
//     const { transformData, resolveData } = options;
//
//     if (resolveData) {
//       return { ...resolveData(result) };
//     } else if (transformData) {
//       const transformedData =
//         data &&
//         (data[transformData.name] || []);
//
//       return {
//         [transformData.propName]: transformedData,
//         ...rest
//       };
//     }
//   }
// };

interface TransformData {
  name: string;
  propName: string;
}

interface QueryHookFactoryOptions<TVariables> extends QueryHookOptions<TVariables> {
  transformData?: TransformData
}

export function queryHookFactory <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  options?: QueryHookFactoryOptions<TVariables>,
): () => QueryHookResult<TData, TVariables> & { [key in TransformData['propName']]: any } {
  return () => {
    const result = useQuery(query, options);

    const { data, ...rest } = result;

    if (!options || !options.transformData) {
      return { ...result };
    }

    const { transformData } = options;

    let transformedData =
      data &&
      data[transformData.name];

    if (Array.isArray(transformedData)) {
      transformedData = transformedData || [];
    }

    return {
      [transformData.propName]: transformedData,
      ...rest
    };
  };
}