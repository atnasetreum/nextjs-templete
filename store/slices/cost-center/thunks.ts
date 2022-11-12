/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client/core';

import { setCostCenter } from './costCenterSlice';

const GET_COST_CENTERS = gql`
  query CostCenter(
    $costCenterId: Int
    $site: Sites
    $carrier: String
    $provider: String
    $coverage: String
    $service: String
    $notation: [String!]
    $createDateInit: DateTime
    $createDateEnd: DateTime
    $startDateEnd: DateTime
    $endDateInit: DateTime
    $endDateEnd: DateTime
    $status: String
    $version: Int
    $currentVersion: Boolean
    $idGroup: Int
  ) {
    avion: costCenter(
      id: $costCenterId
      site: $site
      carrier: $carrier
      provider: $provider
      coverage: $coverage
      service: $service
      notation: $notation
      createDateInit: $createDateInit
      createDateEnd: $createDateEnd
      startDateEnd: $startDateEnd
      endDateInit: $endDateInit
      endDateEnd: $endDateEnd
      status: $status
      version: $version
      current_version: $currentVersion
      idGroup: $idGroup
    ) {
      id
      site
      carrier
      provider
    }
  }
`;

export const getOrganizationTask =
  (identity: any) =>
  async (dispatch: any, _: any, { client }: { client: any }) => {
    console.log('identity', identity);
    return client
      .query('avion', GET_COST_CENTERS, identity)
      .then((data: any) => dispatch(setCostCenter(data)));
    //.catch((e) => dispatch(setOrganizationErrorAction(e.message)))
    //.finaly(() => dispatch(setOrganizationRequestInProgress(false)));
  };
