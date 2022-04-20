const IP_HEADERS = [
    'Forwarded',
    'Forwarded-For',
    'X-Forwarded',
    'X-Forwarded-For',     
    'X-Client-IP',
    'X-Real-IP',           
    'X-Cluster-Client-IP', 
    'Proxy-Client-IP',
    'CF-Connecting-IP',   
    'Fastly-Client-Ip',    
    'True-Client-Ip',     
    'WL-Proxy-Client-IP',
    'HTTP_X_FORWARDED_FOR',
    'HTTP_X_FORWARDED',
    'HTTP_X_CLUSTER_CLIENT_IP',
    'HTTP_CLIENT_IP',
    'HTTP_FORWARDED_FOR',
    'HTTP_FORWARDED',
    'HTTP_VIA',
    'REMOTE_ADDR'


];

const getRequestIpAddress = request => {
    const headers = request.headers;
    for (const header of IP_HEADERS) {
        const value = headers[header];
        if (value) {
            const parts = value.split(/\s*,\s*/g);
            return parts[0] ?? null;
        }
    }
    const client = request.connection ?? request.socket ?? request.info;
    if (client) {
        return client.remoteAddress ?? null;
    }
    return null;
};

module.exports = {
    getRequestIpAddress
};