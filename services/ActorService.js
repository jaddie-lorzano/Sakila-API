import ACTOR_CONSTANTS from '../constants/ActorConstants.js'

let ActorService = {
    // get list of query parameters
    getQueryParamList : (query) => {
        let queryParamList = [];
        for (let queryParam in query) {
            queryParamList.push(queryParam);
        }
        return queryParamList
    },
    getValidAndInvalidQueryParamList : (queryParamList) => {
        let validQueryParamList = [];
        let invalidQueryParamList = [];
        queryParamList.forEach((param) => { 
            if (ACTOR_CONSTANTS.ACTOR_FILTER_PARAM.includes(param)) {
                validQueryParamList.push(param) // list all valid query parameters
            } else {
                invalidQueryParamList.push(param) // list all invalid query parameters
            }
        });
        return [ validQueryParamList, invalidQueryParamList ]
    },
    checkIfBadRequestError : (validQueryParamList, invalidQueryParamList, res) => {
        if (validQueryParamList.length == 0) {
            let httpResponse = {
                'statusCode': 400,
                'statusMessage': 'Bad Request',
                'message': `Invalid query parameter(s) were specified. ${invalidQueryParamList.join(', ')}`,
                'error': {
                    'code': 'BAD_REQUEST',
                    'message': `Invalid query parameter(s) were specified. ${invalidQueryParamList.join(', ')}`
                }
            }
            res.status(httpResponse.statusCode).json(httpResponse);
            return
        }
    },
    generateDbTableColumnAndValueList: (validQueryParamList, query) => {
        let dbTableColumnList = [];
        let dbValuesList = [];

        validQueryParamList.forEach((param) => {
            if (param == 'last_name') dbTableColumnList.push(ACTOR_CONSTANTS.ACTOR_TABLE_LAST_NAME_COLUMN); // add last name column name
            if (param == 'first_name') dbTableColumnList.push(ACTOR_CONSTANTS.ACTOR_TABLE_FIRST_NAME_COLUMN); // add first name column name
            dbValuesList.push(`${query[param]}%`);
        })
        return [ dbTableColumnList, dbValuesList ];
    },
    getDbQueryTableAndValues : (req, res, next) => {
        let queryParamList = ActorService.getQueryParamList(req.query); 
        // get list of query parameters

        let [ validQueryParamList, invalidQueryParamList ] = ActorService.getValidAndInvalidQueryParamList(queryParamList);
        // get list of valid and invalid query params

        ActorService.checkIfBadRequestError(validQueryParamList, invalidQueryParamList, res);
        // if there is no valid query params, then return HTTP status code 400: BAD REQUEST

        let [ dbTableColumnList, dbValuesList ] = ActorService.generateDbTableColumnAndValueList(validQueryParamList, req.query);
        // generate the list of table column and values for the db query

        return [ dbTableColumnList, dbValuesList ];
    }
}

export default ActorService