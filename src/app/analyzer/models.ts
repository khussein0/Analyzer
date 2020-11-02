export interface CallType {
    calltype_id: string,
    name: string
}

export interface Call {
    call_id: string,
    calltype_id: string,
    agent: Agent,
    customer: Customer,
    call_start_time: string,
    gs_file_url: string,
    duration: string
}

export interface Agent {
    agent_id: string,
    full_name?: string,
    email?: string,
    channel_no?: string
}

export interface Customer {
    full_name: string,
    channel_no: string
}

export interface CallDetail {
    call_id: string,
    file_url: string,
    calltype_id: string
    call_datetime: string,
    duration: string,
    agent: Agent,
    customer: Customer[],
    script: Script[],
    transcript: Transcript[]
}

export interface Script {
    order: string,
    similarity: string,
    sentence: string,
    matching_sentence: string
}

export interface Transcript {
    order: string,
    similarity: string,
    sentence: string,
    matching_sentence: string,
    channel: string,
    timeFrom: string,
    timeTo: string
}