//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.9;

contract PassDapp {
    error IndexError(uint256 index, uint256 maxIndex);

    struct Credential {
        string name;
        string site;
        string secret;
    }
    mapping(address => Credential[]) private _credentials;

    function addPass(Credential calldata _credential) public {
        _credentials[msg.sender].push(_credential);
    }

    function getAllPasses() public view returns (Credential[] memory) {
        return _credentials[msg.sender];
    }

    function deletePass(uint256 _index) public {
        uint256 _maxIndex = _credentials[msg.sender].length;
        if (_index >= _maxIndex) {
            revert IndexError(_index, _maxIndex - 1);
        }
        _credentials[msg.sender][_index] = _credentials[msg.sender][
            _maxIndex - 1
        ];
        _credentials[msg.sender].pop();
    }

    function updatePass(uint256 _index, Credential calldata _credential)
        public
    {
        if (_index >= _credentials[msg.sender].length) {
            revert IndexError(_index, _credentials[msg.sender].length - 1);
        }
        _credentials[msg.sender][_index] = _credential;
    }
}
